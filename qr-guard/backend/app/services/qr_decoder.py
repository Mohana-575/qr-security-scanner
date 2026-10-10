from urllib.parse import urlsplit

import cv2
import numpy as np


class InvalidImageError(ValueError):
    pass


class QRCodeNotFoundError(ValueError):
    pass


def decode_qr_code(image_bytes: bytes) -> tuple[str, bool]:
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    if image is None:
        raise InvalidImageError

    content, points, _ = cv2.QRCodeDetector().detectAndDecode(image)
    if points is None or not content:
        raise QRCodeNotFoundError

    try:
        parsed_content = urlsplit(content)
        is_url = parsed_content.scheme.lower() in {"http", "https"} and bool(
            parsed_content.netloc
        )
    except ValueError:
        is_url = False

    return content, is_url