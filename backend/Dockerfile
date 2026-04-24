FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /app

# Copia archivos de build primero para aprovechar cache de dependencias.
COPY pom.xml .
RUN mvn -q -DskipTests dependency:go-offline

COPY src ./src
RUN mvn -q -DskipTests clean package

FROM eclipse-temurin:17-jre
WORKDIR /app

# Copia el artefacto generado en la etapa de compilacion.
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
