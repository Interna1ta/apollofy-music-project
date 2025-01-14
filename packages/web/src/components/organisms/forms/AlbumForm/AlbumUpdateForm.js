import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { useFormik } from "formik";
import { useFetchAlbum, useUpdateAlbum } from "../../../../hooks/useAlbums";
import { useFetchGenres } from "../../../../hooks/useGenres";
import validationSchema from "../../../../schemas/AlbumSchema";
import {
  Box,
  Alert,
  AlertTitle,
  Input,
  InputLabel,
  Select,
  TextField,
  Container,
  MenuItem,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { uploadResource } from "../../../../api/api-cloudinary";
import withLayout from "../../../hoc/withLayout";
import { useFetchUserTracks } from "../../../../hooks/useTracks";
import { useParams } from "react-router-dom";

function initialValues(responseData = {}) {
  return {
    id: responseData.id,
    title: responseData.title,
    released_date: responseData.released_date,
    genres: responseData.genres,
    tracks: responseData.tracks,
    url_image: responseData.thumbnails?.url_default,
  };
}

const allowedImageExt = ["jpg", "jpeg", "png"];

function AlbumUpdateForm() {
  const { id } = useParams();

  const {
    isLoading: updateAlbumIsLoading,
    isError: updateAlbumIsError,
    isSuccess: updateAlbumIsSuccess,
    error: updateAlbumError,
    data: updateAlbumResponse,
    mutate,
  } = useUpdateAlbum();

  const {
    isLoading: fetchAlbumIsLoading,
    isError: fetchAlbumIsError,
    isSuccess: fetchAlbumIsSuccess,
    error: fetchAlbumError,
    data: fetchAlbumResponse,
  } = useFetchAlbum(id);

  const {
    isLoading: fetchMyTracksIsLoading,
    isError: fetchMyTracksIsError,
    isSuccess: fetchMyTracksIsSuccess,
    error: fetchMyTracksError,
    data: fetchMyTracksResponse,
  } = useFetchUserTracks();

  const {
    isLoading: fetchGenresIsLoading,
    isError: fetchGenresIsError,
    isSuccess: fetchGenresIsSuccess,
    error: fetchGenresError,
    data: fetchGenresResponse,
  } = useFetchGenres();

  // const navigate = useNavigate();


  const formik = useFormik({
  initialValues:initialValues(fetchAlbumResponse?.data?.data),
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      const data = {
        id: values.id,
        title: values.title,
        released_date: values.released_date,
        genres: values.genres,
        url: values.url_album,
        duration: values.duration,
        thumbnails: {
          url_default: values.url_image,
        },
      };

      mutate(data);
    },
  });

  const {
    values,
    errors,
    touched,
    isValid,
    isValidating,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldError,
  } = formik;


  // console.log(fetchAlbumIsSuccess,fetchGenresIsSuccess,fetchMyTracksIsSuccess)
  return (
    <Container as="main">
      <Typography sx={{ fontSize: "2rem", fontWeight: "light", mb: 2 }}>Update Album</Typography>
      {updateAlbumIsSuccess && (
        <Alert sx={{ mb: 2 }} severity={updateAlbumResponse.data.success ? "success" : "error"}>
          {updateAlbumResponse.data.message}
        </Alert>
      )}
      {updateAlbumIsError && (
        <Alert sx={{ mb: 2 }} severity="error">
          {updateAlbumError.message}
        </Alert>
      )}
      {(fetchAlbumIsError || fetchGenresIsError || fetchMyTracksIsError) && (
        <Alert sx={{ mb: 2 }} severity="error" variant="filled">
          <AlertTitle>Something went wrong</AlertTitle>
          {fetchAlbumIsError && <Box>Album request: {fetchAlbumError?.message}</Box>}
          {fetchGenresIsError && <Box>Genres request: {fetchGenresError?.message}</Box>}
          {fetchMyTracksIsError && <Box>Tracks request: {fetchMyTracksError?.message}</Box>}
        </Alert>
      )}
      {(fetchAlbumIsLoading || fetchGenresIsLoading || fetchMyTracksIsLoading) && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: "4rem" }}>
          <CircularProgress size={128} />
        </Box>
      )}
      { fetchGenresIsSuccess && fetchMyTracksIsSuccess && (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 0, md: 2 },
            }}
          >
            <Box sx={{ flexGrow: 1, mb: 3 }}>
              <InputLabel sx={{ mb: 1 }} htmlFor="input_title">
                Album title
              </InputLabel>
              <input type="hidden" name="id_album" id="id_album" values={values.id} />
              <TextField
                fullWidth
                size="small"
                id="input_title"
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.title && errors.title)}
                helperText={errors.title}
              />
            </Box>
            <Box sx={{ flexGrow: 1, mb: 3 }}>
              <InputLabel sx={{ mb: 1 }} htmlFor="input_released_date">
                Release date
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                id="input_released_date"
                name="released_date"
                type="date"
                value={values.released_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.released_date && errors.released_date)}
                helperText={errors.released_date}
              />
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, mb: 3 }}>
            <InputLabel sx={{ mb: 1 }} htmlFor="input_genres">
              Genre(s)
            </InputLabel>
            <Select
              fullWidth
              id="input_genres"
              name="genres"
              multiple
              value={values.genres}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.genres && errors.genres)}
              input={<Input />}
            >
              {fetchGenresResponse.data.data.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ flexGrow: 1, mb: 3 }}>
            <InputLabel sx={{ mb: 1 }} htmlFor="input_tracks">
              Track(s)
            </InputLabel>
            <Select
              fullWidth
              id="input_tracks"
              name="tracks"
              multiple
              value={values.tracks}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.tracks && errors.tracks)}
              input={<Input />}
            >
              {fetchMyTracksResponse.data.data.map((track) => (
                <MenuItem key={track.title} value={track.id}>
                  {track.title}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ mb: 3 }}>
            <InputLabel sx={{ mb: 1 }} htmlFor="input_album_cover">
              Cover image file
            </InputLabel>
            <FileUploader
              handleChange={(file) => {
                uploadResource(file, "image")
                  .then((res) => {
                    setFieldValue("url_image", res.data.url);
                  })
                  .catch((err) => {
                    setFieldError("url_image", err.message);
                  });
              }}
              name="input_album_cover"
              types={allowedImageExt}
            />
            {touched.url_image && errors.url_image && (
              <FormHelperText style={{ color: "#d32f2f" }}>{errors.url_image}</FormHelperText>
            )}
          </Box>
          {values?.url_image && (
            <Box>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.6)", mb: 1 }}>
                Cover image preview
              </Typography>
              <img
                style={{
                  width: "10rem",
                  marginBottom: "1rem",
                  aspectRatio: "4/3",
                  objectFit: "contain",
                  objectPosition: "center",
                  borderRadius: "0.25rem",
                  boxShadow: "0 0 0.25rem rgba(0, 0, 0, 0.5)",
                }}
                src={values.url_image}
                alt="preview"
              />
              <Typography sx={{ color: "rgba(0, 0, 0, 0.6)", mb: 1 }}>Cover image URL</Typography>
              <Typography sx={{ fontSize: "0.9rem", mb: 3 }}>{values.url_image}</Typography>
            </Box>
          )}
          <LoadingButton
            type="submit"
            disabled={!isValid}
            loading={isValidating || updateAlbumIsLoading}
            variant="contained"
          >
            Update album
          </LoadingButton>
        </form>
      )}
    </Container>
  );
}

export default withLayout(AlbumUpdateForm);
