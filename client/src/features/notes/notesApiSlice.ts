import apiSlice from "@/app/api/apiSlice";
import { HTTPMethods, INote, TagTypes } from "@/components/types/types";
import { notesApiUrl } from "@/constants";

const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: (id: string | undefined) => {
        if (id) return notesApiUrl + `/${id}`;
        return notesApiUrl;
      },
      providesTags: [TagTypes.NOTE], // QUERY: Provides Tag
      keepUnusedDataFor: 5,
    }),
    createNote: builder.mutation({
      query: (body: INote) => ({
        url: notesApiUrl,
        method: HTTPMethods.POST,
        body,
      }),
      invalidatesTags: [TagTypes.NOTE], // MUTATION: Invalidates Tag
    }),
    updateNote: builder.mutation({
      query: ({ _id: id, ...update }: INote) => ({
        url: notesApiUrl + `/${id}`,
        method: HTTPMethods.PUT,
        body: update,
      }),
      invalidatesTags: [TagTypes.NOTE], // MUTATION: Invalidates
    }),
    deleteNote: builder.mutation({
      query: (id: string) => ({
        url: notesApiUrl + `/${id}`,
        method: HTTPMethods.DELETE,
      }),
      invalidatesTags: [TagTypes.NOTE], // MUTATION: Invalidates
    }),
  }),
});

export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;
