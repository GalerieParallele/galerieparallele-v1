-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "avatarURL" TEXT,
    "email" TEXT NOT NULL,
    "lastname" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "postalCode" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "roles" JSONB NOT NULL DEFAULT '["ROLE_USER"]',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistSaveTheDate" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "photoURL" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "ArtistSaveTheDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editorId" INTEGER,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleTag" (
    "articleId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "ArticleTag_pkey" PRIMARY KEY ("articleId","tagId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "pseudo" TEXT,
    "bio" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "linkedin" TEXT,
    "website" TEXT,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistExposition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "ArtistExposition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistTag" (
    "artistId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "ArtistTag_pkey" PRIMARY KEY ("artistId","tagId")
);

-- CreateTable
CREATE TABLE "ArtistLegalInformation" (
    "id" SERIAL NOT NULL,
    "societe" TEXT NOT NULL,
    "adrNumVoie" TEXT NOT NULL,
    "adrRue" TEXT NOT NULL,
    "adrVille" TEXT NOT NULL,
    "adrCodePostal" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "tva" TEXT NOT NULL,
    "numMaisonsDesArtistes" TEXT NOT NULL,
    "numSecuriteSociale" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "ArtistLegalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Oeuvre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "anecdote" TEXT,
    "hauteur" INTEGER NOT NULL,
    "longueur" INTEGER NOT NULL,
    "largeur" INTEGER,
    "prix" INTEGER NOT NULL DEFAULT 0,
    "numerotation" INTEGER NOT NULL,
    "support" TEXT NOT NULL,
    "technique" TEXT NOT NULL,
    "encadrement" TEXT NOT NULL,
    "signature" TEXT NOT NULL,

    CONSTRAINT "Oeuvre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OeuvreImage" (
    "id" SERIAL NOT NULL,
    "mediaURL" TEXT NOT NULL,
    "oeuvreId" INTEGER NOT NULL,

    CONSTRAINT "OeuvreImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypesOeuvre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypesOeuvre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OeuvreTypes" (
    "oeuvreId" INTEGER NOT NULL,
    "typeOeuvreId" INTEGER NOT NULL,

    CONSTRAINT "OeuvreTypes_pkey" PRIMARY KEY ("oeuvreId","typeOeuvreId")
);

-- CreateTable
CREATE TABLE "OeuvreTag" (
    "oeuvreId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "OeuvreTag_pkey" PRIMARY KEY ("oeuvreId","tagId")
);

-- CreateTable
CREATE TABLE "ArtistOeuvre" (
    "artistId" INTEGER NOT NULL,
    "oeuvreId" INTEGER NOT NULL,

    CONSTRAINT "ArtistOeuvre_pkey" PRIMARY KEY ("artistId","oeuvreId")
);

-- CreateTable
CREATE TABLE "ArtistUnknowOeuvre" (
    "artistId" INTEGER NOT NULL,
    "oeuvreId" INTEGER NOT NULL,

    CONSTRAINT "ArtistUnknowOeuvre_pkey" PRIMARY KEY ("artistId","oeuvreId")
);

-- CreateTable
CREATE TABLE "ArtistUnknow" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ArtistUnknow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_userid_key" ON "Artist"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistLegalInformation_siret_key" ON "ArtistLegalInformation"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistLegalInformation_tva_key" ON "ArtistLegalInformation"("tva");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistLegalInformation_numSecuriteSociale_key" ON "ArtistLegalInformation"("numSecuriteSociale");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistLegalInformation_artistId_key" ON "ArtistLegalInformation"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "TypesOeuvre_name_key" ON "TypesOeuvre"("name");

-- AddForeignKey
ALTER TABLE "ArtistSaveTheDate" ADD CONSTRAINT "ArtistSaveTheDate_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTag" ADD CONSTRAINT "ArticleTag_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTag" ADD CONSTRAINT "ArticleTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistExposition" ADD CONSTRAINT "ArtistExposition_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistTag" ADD CONSTRAINT "ArtistTag_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistTag" ADD CONSTRAINT "ArtistTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistLegalInformation" ADD CONSTRAINT "ArtistLegalInformation_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OeuvreImage" ADD CONSTRAINT "OeuvreImage_oeuvreId_fkey" FOREIGN KEY ("oeuvreId") REFERENCES "Oeuvre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OeuvreTypes" ADD CONSTRAINT "OeuvreTypes_oeuvreId_fkey" FOREIGN KEY ("oeuvreId") REFERENCES "Oeuvre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OeuvreTypes" ADD CONSTRAINT "OeuvreTypes_typeOeuvreId_fkey" FOREIGN KEY ("typeOeuvreId") REFERENCES "TypesOeuvre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OeuvreTag" ADD CONSTRAINT "OeuvreTag_oeuvreId_fkey" FOREIGN KEY ("oeuvreId") REFERENCES "Oeuvre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OeuvreTag" ADD CONSTRAINT "OeuvreTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistOeuvre" ADD CONSTRAINT "ArtistOeuvre_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistOeuvre" ADD CONSTRAINT "ArtistOeuvre_oeuvreId_fkey" FOREIGN KEY ("oeuvreId") REFERENCES "Oeuvre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistUnknowOeuvre" ADD CONSTRAINT "ArtistUnknowOeuvre_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "ArtistUnknow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistUnknowOeuvre" ADD CONSTRAINT "ArtistUnknowOeuvre_oeuvreId_fkey" FOREIGN KEY ("oeuvreId") REFERENCES "Oeuvre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
