import cv2
import numpy as np


def stretchX(img, min_stretch, max_stretch, samples):
	height, width = img.shape[:2]
	out = []
	for i in range(samples):
		factor = min_stretch + ((max_stretch-min_stretch)/samples)*(i+1)
		new = cv2.resize(img,(int(factor*width), height), interpolation = cv2.INTER_CUBIC)
		out.append(new)
	return out

def stretchY(img, min_stretch, max_stretch, samples):
	height, width = img.shape[:2]
	out = []
	for i in range(samples):
		factor = min_stretch + ((max_stretch-min_stretch)/samples)*(i+1)
		new = cv2.resize(img,width, (int(factor*height)), interpolation = cv2.INTER_CUBIC)
		out.append(new)
	return out


def rotate(img, min_rotate, max_rotate, samples):
	height,width = img.shape[:2]
	out = []
	for i in range(samples):
		angle = min_rotate + ((max_rotate-min_rotate)/samples)*(i+1)
		m = cv2.getRotationMatrix2D((width/2,height/2),angle,1)
		new = cv2.warpAffine(img,m,(width,height))
		out.append(new)
	return out

#example
if __name__ == '__main__':
	print("running example...")
	img = cv2.imread('letter.png') #replace with input image
	for img1 in rotate(img, -30, 30, 10):
		for img2 in stretchX(img1, 0.1, 3, 10):
			cv2.imshow("sample", img2)
			cv2.waitKey()
