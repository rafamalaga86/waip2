-- CreateTable
CREATE TABLE "public"."igdb_tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "expire_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "igdb_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "last_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_superuser" BOOLEAN NOT NULL DEFAULT false,
    "is_staff" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."games" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "igdb_id" INTEGER NOT NULL,
    "igdb_cover_id" TEXT,
    "extra" JSONB NOT NULL DEFAULT '{}',
    "order" INTEGER NOT NULL DEFAULT 10,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."playeds" (
    "id" SERIAL NOT NULL,
    "beaten" BOOLEAN NOT NULL,
    "stopped_playing_at" TIMESTAMP(3),
    "game_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "playeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."games_to_import" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "beaten" BOOLEAN NOT NULL,
    "stopped_playing_at" TIMESTAMP(3),
    "order" INTEGER NOT NULL,
    "extra" JSONB NOT NULL DEFAULT '{}',
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_to_import_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."games_import_history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "igdb_id" INTEGER NOT NULL,
    "old_game_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_import_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "public"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "games_user_id_igdb_id_key" ON "public"."games"("user_id", "igdb_id");

-- AddForeignKey
ALTER TABLE "public"."games" ADD CONSTRAINT "games_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."playeds" ADD CONSTRAINT "playeds_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."games_to_import" ADD CONSTRAINT "games_to_import_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
