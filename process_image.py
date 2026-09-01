import sys
from PIL import Image

input_path = sys.argv[1]
output_path = sys.argv[2]

# Open image
img = Image.open(input_path).convert("RGBA")

# Remove white background
data = img.getdata()
new_data = []
for item in data:
    # item is (R, G, B, A)
    # If the pixel is very close to white, make it transparent
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

img.putdata(new_data)
img.save(output_path, "PNG")
print(f"Saved processed image to {output_path}")
