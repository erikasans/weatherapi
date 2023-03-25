-- CreateTable
CREATE TABLE "CurrentWeather" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL,
    "dt" INTEGER NOT NULL,
    "temp" REAL NOT NULL,
    "feels" REAL NOT NULL,
    "sunrise" INTEGER NOT NULL,
    "sunset" INTEGER NOT NULL
);
