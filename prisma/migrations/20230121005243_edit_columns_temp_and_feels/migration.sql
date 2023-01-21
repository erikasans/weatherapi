/*
  Warnings:

  - You are about to alter the column `feels` on the `CurrentWeather` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `temp` on the `CurrentWeather` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CurrentWeather" (
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
INSERT INTO "new_CurrentWeather" ("city", "dt", "feels", "id", "lat", "lon", "sunrise", "sunset", "temp") SELECT "city", "dt", "feels", "id", "lat", "lon", "sunrise", "sunset", "temp" FROM "CurrentWeather";
DROP TABLE "CurrentWeather";
ALTER TABLE "new_CurrentWeather" RENAME TO "CurrentWeather";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
