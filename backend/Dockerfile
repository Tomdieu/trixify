FROM python:3.10.0-alpine3.15
LABEL authors="ivantom"

WORKDIR /trixify

COPY requirements.txt .

RUN pip install -r requirements.txt

EXPOSE 8000

COPY . .

ENTRYPOINT ["python","manage.py","runserver"]