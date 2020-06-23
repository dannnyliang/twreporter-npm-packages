import { getAccessToken } from './auth'
import { fetchAuthorCollectionIfNeeded } from './author-articles'
import { fetchAuthorDetails } from './author-details'
import { searchAuthorsIfNeeded } from './authors'
import { fetchIndexPageContent } from './index-page'
import {
  fetchAFullPost,
  fetchPostsByCategoryListId,
  fetchPostsByTagListId,
  fetchRelatedPostsOfAnEntity,
} from './posts'
import { fetchAFullTopic, fetchTopics } from './topics'
import {
  createSingleBookmark,
  deleteSingleBookmark,
  getSingleBookmark,
  getMultipleBookmarks,
} from './bookmarks'

export default {
  createSingleBookmark,
  deleteSingleBookmark,
  fetchAFullPost,
  fetchAFullTopic,
  fetchAuthorCollectionIfNeeded,
  fetchAuthorDetails,
  fetchIndexPageContent,
  fetchPostsByCategoryListId,
  fetchPostsByTagListId,
  fetchRelatedPostsOfAnEntity,
  fetchTopics,
  getAccessToken,
  getMultipleBookmarks,
  getSingleBookmark,
  searchAuthorsIfNeeded,
}
