FROM python:3.7

# Install Python Setuptools
RUN apt-get update && apt-get install -y cron
RUN pip install requests bs4

# Copy python scripts over
WORKDIR /usr/app/src
COPY ./* ./

# run crond as main process of container
CMD ["cron", "-f"]


