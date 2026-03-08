import Foundation
import Quartz
import Cocoa

let args = CommandLine.arguments

if args.count < 3 {
    print("Usage: swift pdf_to_img.swift <input.pdf> <output_dir>")
    exit(1)
}

let pdfPath = args[1]
let outputDir = args[2]

let url = URL(fileURLWithPath: pdfPath)
guard let document = PDFDocument(url: url) else {
    print("Error: Cannot open PDF document")
    exit(1)
}

for i in 0..<document.pageCount {
    guard let page = document.page(at: i) else { continue }
    let rect = page.bounds(for: .mediaBox)
    let dpi: CGFloat = 300.0
    let scale = dpi / 72.0 // Apple's default is 72 dpi
    
    // Scale the rect
    let scaledRect = CGRect(x: 0, y: 0, width: rect.width * scale, height: rect.height * scale)
    
    // Create an image representation
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    guard let bitmapInfo = CGImageAlphaInfo.premultipliedLast.rawValue as UInt32? else { continue }
    let contextSize = CGSize(width: scaledRect.width, height: scaledRect.height)
    guard let context = CGContext(data: nil,
                                  width: Int(contextSize.width),
                                  height: Int(contextSize.height),
                                  bitsPerComponent: 8,
                                  bytesPerRow: 0,
                                  space: colorSpace,
                                  bitmapInfo: bitmapInfo) else { continue }
    
    context.setFillColor(CGColor.white)
    context.fill(scaledRect)
    
    context.scaleBy(x: scale, y: scale)
    
    // Draw page
    page.draw(with: .mediaBox, to: context)
    
    guard let cgImage = context.makeImage() else { continue }
    let rep = NSBitmapImageRep(cgImage: cgImage)
    guard let data = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) else { continue }
    
    let path = String(format: "%@/page-%02d.jpg", outputDir, i + 1)
    if FileManager.default.createFile(atPath: path, contents: data, attributes: nil) {
        print("Saved \(path)")
    } else {
        print("Failed to save \(path)")
    }
}
print("Done")
