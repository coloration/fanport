### detect train

视频存网盘了


``` py
import cv2
import numpy as np
# img = cv2.imread("512_512.png")

# cv2.imshow("Test", img)

# if cv2.waitKey(0):
#   cv2.destroyAllWindows()
post_linha = 950

largura_min = 80
altura_min = 80

detec = []
carros = 0

offset = 10

cap = cv2.VideoCapture('video.mp4')
fps = cap.get(cv2.CAP_PROP_FPS) / 3
subtracao = cv2.bgsegm.createBackgroundSubtractorMOG()

def pega_centro(x, y, w, h):
  x1 = int(w / 2)
  y1 = int(h / 2)
  cx = x + x1
  cy = y + y1
  return cx, cy


acc = 0

while True:
  ret, frame1 = cap.read()
  acc += 1
  if acc <= 3: continue
  acc = 0

  grey = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
  blur = cv2.GaussianBlur(grey, (7, 7), 5)
  img_sub = subtracao.apply(blur)
  dilat = cv2.dilate(img_sub, np.ones((5, 5)))
  kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
  dilatada = cv2.morphologyEx(dilat, cv2.MORPH_CLOSE, kernel)
  dilatada = cv2.morphologyEx(dilatada, cv2.MORPH_CLOSE, kernel)

  contorno, h = cv2.findContours(dilatada, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
  cv2.line(frame1, (140, post_linha), (1800, post_linha), (255, 127, 0), 3)

  for (i, c) in enumerate(contorno):
    (x, y, w, h) = cv2.boundingRect(c)
    validar_contorno = (w >= largura_min) and (h >= altura_min)
    if not validar_contorno:
      continue

    cv2.rectangle(frame1, (x, y), (x + w, y + h), (0, 255, 0), 2)
    centro = pega_centro(x, y, w, h)
    detec.append(centro)
    cv2.circle(frame1, centro, 4, (0, 0, 255), -1)

    for (x, y) in detec:
      if y < (post_linha + offset) and y > (post_linha - offset):
        carros += 1
        cv2.line(frame1, (140, post_linha), (1800, post_linha), (0, 255, 0), 3)
        detec.remove((x, y))

  cv2.putText(frame1, "VEHICLE COUNT: " + str(carros), (450, 200), cv2.FONT_HERSHEY_COMPLEX, 2, (0, 0, 0))
  cv2.imshow("Video Original", frame1)
  # cv2.imshow("Video Original", frame1)
  if cv2.waitKey(int(1000/fps)) & 0xFF == ord('q'):
    break

cap.release()
cv2.destroyAllWindows()
```