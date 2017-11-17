from skimage.measure import structural_similarity as ssim

if ssim(imageA, imageb) >= 0.5:
    print(match)
else:
    print(no match)
