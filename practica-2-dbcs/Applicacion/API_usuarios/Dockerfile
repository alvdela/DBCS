FROM maven:3-adoptopenjdk-16 AS MAVEN_BUILD
WORKDIR /app
COPY ./ ./
RUN mvn -Dmaven.test.skip clean package
FROM openjdk:11
ARG JAR_FILE=/app/target/*.jar
COPY --from=MAVEN_BUILD ${JAR_FILE} app.jar
ENV PORT 8080
EXPOSE $PORT
ENTRYPOINT ["java","-jar", "/app.jar"]