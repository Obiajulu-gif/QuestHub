const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const inputDir = path.join(__dirname, "../public")
const outputDir = path.join(__dirname, "../public/optimized")

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Get all image files
const imageFiles = fs.readdirSync(inputDir).filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))

// Process each image
async function optimizeImages() {
  console.log(`Found ${imageFiles.length} images to optimize`)

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file)
    const fileNameWithoutExt = path.parse(file).name
    const webpOutputPath = path.join(outputDir, `${fileNameWithoutExt}.webp`)
    const avifOutputPath = path.join(outputDir, `${fileNameWithoutExt}.avif`)

    console.log(`Optimizing ${file}...`)

    try {
      // Create WebP version
      await sharp(inputPath).webp({ quality: 80 }).toFile(webpOutputPath)

      // Create AVIF version (higher quality but smaller file size)
      await sharp(inputPath).avif({ quality: 65 }).toFile(avifOutputPath)

      // Create responsive versions for WebP
      const sizes = [640, 750, 1080]
      for (const size of sizes) {
        const responsiveWebpPath = path.join(outputDir, `${fileNameWithoutExt}-${size}.webp`)
        await sharp(inputPath).resize(size).webp({ quality: 75 }).toFile(responsiveWebpPath)
      }

      console.log(`✅ ${file} optimized successfully`)
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error)
    }
  }
}

optimizeImages().then(() => {
  console.log("Image optimization complete!")
})
