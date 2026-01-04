pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-node-app"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Pavan1471/cicd'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Use commit hash as tag
                    def commit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                    sh "docker build -t ${IMAGE_NAME}:${commit} ."
                }
            }
        }

        stage('List Local Docker Images') {
            steps {
                sh "docker images"
            }
        }
    }
}
