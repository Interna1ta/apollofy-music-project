const db = require("../../services/db");
const faker = require("faker");
const { Types, get } = require("mongoose");
const AlbumModel = require("../album-model");
const { getRandomSequence } = require("../../utils");
const { createSampleAlbum } = require("../../db/samplers");
const { seedUserCollection, seedGenreCollection } = require("../../db/collections");

describe("album-schema", () => {
  let sample;
  let users;
  let genres;

  beforeAll(async () => {
    await db.start();
    await db.connect();

    users = await seedUserCollection();
    genres = await seedGenreCollection();
    sample = createSampleAlbum(users, genres);
  });

  afterAll(async () => {
    await db.disconnect();
    await db.stop();
  });

  afterEach(async () => {
    await AlbumModel.deleteMany();
  });

  describe("1. User ID", () => {
    test("1.1. User ID is required", async () => {
      expect.assertions(1);

      const { user, ...album } = sample;

      try {
        await AlbumModel.create(album);
      } catch (error) {
        expect(error.errors.user.properties.type).toBe("required");
      }
    });

    test("1.2. User ID is trimmed", async () => {
      expect.assertions(1);

      const user = getRandomSequence(28);

      const album = {
        ...sample,
        user: ` ${user} `,
      };

      const createdAlbum = await AlbumModel.create(album);

      expect(createdAlbum).toHaveProperty("user", user);
    });
  });

  describe("2. Title", () => {
    test("2.1. Title is required", async () => {
      expect.assertions(1);

      const { title, ...album } = sample;

      try {
        await AlbumModel.create(album);
      } catch (error) {
        expect(error.errors.title.properties.type).toBe("required");
      }
    });

    test("2.2. Title is trimmed", async () => {
      expect.assertions(1);

      const title = faker.name.title();

      const album = {
        ...sample,
        title: ` ${title} `,
      };

      const createdAlbum = await AlbumModel.create(album);

      expect(createdAlbum).toHaveProperty("title", title);
    });
  });

  describe("3. Released date", () => {
    test("3.1. Released date must be with format 'YYYY-MM-DD' and valid", async () => {
      expect.assertions(1);

      const validAlbum = {
        ...sample,
        released_date: "2000-01-01",
      };

      const invalidAlbum = {
        ...sample,
        released_date: "1st January 2000",
      };

      await AlbumModel.create(validAlbum);
      await AlbumModel.create(invalidAlbum).catch((error) => {
        expect(error.errors.released_date.properties.type).toBe("user defined");
      });
    });

    test("3.2. Released date is trimmed", async () => {
      expect.assertions(1);

      const released_date = "2000-01-01";

      const track = {
        ...sample,
        released_date: ` ${released_date} `,
      };

      const createdAlbum = await AlbumModel.create(track);

      expect(createdAlbum).toHaveProperty("released_date", released_date);
    });
  });

  describe("4. Genres", () => {
    test("4.1. Genres must be an array of String", async () => {
      expect.assertions(3);

      const idGenre = new Types.ObjectId().toString();

      const validAlbum01 = {
        ...sample,
        genres: [idGenre],
      };

      const validAlbum02 = {
        ...sample,
        genres: idGenre,
      };

      const invalidAlbum = {
        ...sample,
        genres: ["foo"],
      };

      await AlbumModel.create(validAlbum01).then((createdAlbum) => {
        expect(createdAlbum.genres[0].toString()).toBe(idGenre);
      });

      await AlbumModel.create(validAlbum02).then((createdAlbum) => {
        expect(createdAlbum.genres[0].toString()).toBe(idGenre);
      });

      await AlbumModel.create(invalidAlbum).catch((error) => {
        expect(error.errors["genres.0"].kind).toBe("[ObjectId]");
      });
    });
  });

  describe("5. Tracks", () => {
    test("5.1. Tracks must be an array of ObjectId", async () => {
      expect.assertions(3);

      const idTrack = new Types.ObjectId().toString();

      const validAlbum01 = {
        ...sample,
        tracks: [idTrack],
      };

      const validAlbum02 = {
        ...sample,
        tracks: idTrack,
      };

      const invalidAlbum = {
        ...sample,
        tracks: ["foo"],
      };

      await AlbumModel.create(validAlbum01).then((createdAlbum) => {
        expect(createdAlbum.tracks[0].toString()).toBe(idTrack);
      });

      await AlbumModel.create(validAlbum02).then((createdAlbum) => {
        expect(createdAlbum.tracks[0].toString()).toBe(idTrack);
      });

      await AlbumModel.create(invalidAlbum).catch((error) => {
        expect(error.errors["tracks.0"].kind).toBe("[ObjectId]");
      });
    });
  });

  describe("6. Liked by", () => {
    test("6.1. Liked by must be an array of String", async () => {
      expect.assertions(2);

      const idUser = getRandomSequence(28);

      const validAlbum01 = {
        ...sample,
        liked_by: [idUser],
      };

      const validAlbum02 = {
        ...sample,
        liked_by: idUser,
      };

      await AlbumModel.create(validAlbum01).then((createdAlbum) => {
        expect(createdAlbum.liked_by[0]).toBe(idUser);
      });

      await AlbumModel.create(validAlbum02).then((createdAlbum) => {
        expect(createdAlbum.liked_by[0]).toBe(idUser);
      });
    });
  });

  describe("7. Thumbnail (default)", () => {
    test("7.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const album = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: ` ${url} `,
        },
      };

      const createdAlbum = await AlbumModel.create(album);

      expect(createdAlbum).toHaveProperty("thumbnails.url_default", url);
    });

    test("7.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const album = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_default: url,
        },
      };

      try {
        await AlbumModel.create(album);
      } catch (error) {
        expect(error.errors["thumbnails.url_default"].properties.type).toBe("user defined");
      }
    });
  });

  describe("8. Thumbnail (medium)", () => {
    test("8.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const album = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: ` ${url} `,
        },
      };

      const createdAlbum = await AlbumModel.create(album);

      expect(createdAlbum).toHaveProperty("thumbnails.url_medium", url);
    });

    test("8.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const album = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_medium: url,
        },
      };

      try {
        await AlbumModel.create(album);
      } catch (error) {
        expect(error.errors["thumbnails.url_medium"].properties.type).toBe("user defined");
      }
    });
  });

  describe("9. Thumbnail (large)", () => {
    test("9.1. Thumbnail URL is trimmed", async () => {
      expect.assertions(1);

      const url = faker.image.imageUrl();

      const album = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: ` ${url} `,
        },
      };

      const createdAlbum = await AlbumModel.create(album);

      expect(createdAlbum).toHaveProperty("thumbnails.url_large", url);
    });

    test("9.2. Thumbnail URL must be valid", async () => {
      expect.assertions(1);

      const url = "foo";

      const album = {
        ...sample,
        thumbnails: {
          ...sample.thumbnails,
          url_large: url,
        },
      };

      try {
        await AlbumModel.create(album);
      } catch (error) {
        expect(error.errors["thumbnails.url_large"].properties.type).toBe("user defined");
      }
    });
  });

  describe("10. Number of likes", () => {
    test("10.1. Value depends on the length of the 'liked_by' array", async () => {
      expect.assertions(1);

      const length = 2;

      const album = {
        ...sample,
        liked_by: Array.from({ length }, () => getRandomSequence(28)),
      };

      const createdAlbum = await AlbumModel.create(album);

      expect(createdAlbum).toHaveProperty("num_likes", length);
    });

    test("10.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const album = {
        ...sample,
        num_likes: 1000,
      };

      const createdAlbum = await AlbumModel.create(album);

      expect(createdAlbum).toHaveProperty("num_likes", createdAlbum.liked_by.length);
    });
  });

  describe("11. Number of tracks", () => {
    test("11.1. Value depends on the length of the 'tracks' array", async () => {
      expect.assertions(1);

      const length = 2;

      const album = {
        ...sample,
        tracks: Array.from({ length }, () => new Types.ObjectId().toString()),
      };

      const createdAlbum = await AlbumModel.create(album);

      expect(createdAlbum).toHaveProperty("num_tracks", length);
    });

    test("11.2. Value is readonly / cannot be overwritten (virtual)", async () => {
      expect.assertions(1);

      const album = {
        ...sample,
        num_tracks: 1000,
      };

      const createdAlbum = await AlbumModel.create(album);

      expect(createdAlbum).toHaveProperty("num_tracks", createdAlbum.tracks.length);
    });
  });
});
