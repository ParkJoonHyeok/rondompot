FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml ./
COPY .mvn .mvn
COPY mvnw mvnw
COPY mvnw.cmd mvnw.cmd
COPY src src

RUN ./mvnw -DskipTests clean package

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/randompot-api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

# application.properties already maps server.port to ${PORT:8080}
ENTRYPOINT ["java", "-jar", "app.jar"]
