FROM python:3.10.10

WORKDIR /app

COPY requirements.txt ./
RUN apt-get update && apt-get install -y libgl1-mesa-glx
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p ./static

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
