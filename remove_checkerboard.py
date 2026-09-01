import sys
from PIL import Image

input_path = sys.argv[1]
output_path = sys.argv[2]

img = Image.open(input_path).convert("RGBA")
data = img.getdata()
new_data = []

# For fake checkerboard on light backgrounds, removing all light pixels usually works.
for item in data:
    if item[0] > 230 and item[1] > 230 and item[2] > 230:
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

img.putdata(new_data)
img.save(output_path, "PNG")
print("Done")
