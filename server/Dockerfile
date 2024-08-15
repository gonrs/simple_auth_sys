FROM openjdk:21-jdk-slim

WORKDIR /app

COPY /out/artifacts/server_jar/server.jar /app/server.jar

ENTRYPOINT ["java", "-jar", "server.jar"]