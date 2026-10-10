from pydantic import BaseModel


class DecodeResponse(BaseModel):
    success: bool
    content: str
    is_url: bool