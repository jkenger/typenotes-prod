import apiSlice from "@/app/api/apiSlice";
import { HTTPMethods, IUser, TagTypes } from "@/components/types/types";
import { userApiUrl } from "@/constants";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (id: string | undefined) => {
        if (id) return userApiUrl + `/${id}`;
        return userApiUrl;
      },
      providesTags: [TagTypes.USER],
      keepUnusedDataFor: 5,
    }),
    createUser: builder.mutation({
      query: (body: IUser) => ({
        url: userApiUrl,
        method: HTTPMethods.POST,
        body,
      }),
      invalidatesTags: [TagTypes.USER],
    }),
    updateUser: builder.mutation({
      query: ({ _id: id, ...update }: IUser) => ({
        url: userApiUrl + `/${id}`,
        method: HTTPMethods.PUT,
        body: update,
      }),
      invalidatesTags: [TagTypes.USER],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: userApiUrl + `/${id}`,
        method: HTTPMethods.DELETE,
      }),
      invalidatesTags: [TagTypes.USER],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
