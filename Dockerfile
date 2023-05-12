# Base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install -r requirements.txt

# Install Node.js
# RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
# RUN apt-get update && apt-get install -y nodejs

# Copy the package.json and package-lock.json files
# COPY package*.json ./

# Install Node.js dependencies
# RUN npm install

# Copy the Django project files
COPY . .

# Build the React frontend
# RUN npm run build

# Expose the port
EXPOSE 9000

# Run Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
