interface IPost {
  id: string,
  title: string,
  image?: string,
  content?: string,
  createdAt?: {
    seconds: number,
    nanoeconds: number
  }
}

interface RootState {
  postReducer: PostState,
  modalReducer: AppState,
  formReducer: AppState,
}

interface IFormState {
  [index: string]: any,
  title?: string,
  image?: string,
  content?: string
}

interface IParams {
  id?: string
}

interface IProps {
  children?: ReactNode;
  post?: IPost,
  postDetails?: IPost | any,
  ref?: any,
  forwardedRef?: any

}

type PostState = {
  posts?: IPost[],
  iPosts?: IPost[],
  postDetails?: IPost | {},
  loading?: boolean,
  error?: Object | string | null,
  lastVisible?: object | null,
  chunks?: IPost[],
  pPosts?: IPost[],
  hasmore?: boolean,
  nHasmore?: boolean,
  pHasmore?: boolean,
  tracker?: string,
  trackerNext?: string,
  trackerPrev?: string,
}

type PostAction = {
  type: string,
  payload?: any
}

type AppState = {
  modalShow?: boolean,
  isUpdating?: boolean,
  currentPost?: IPost | {
    id?: string,
    title?: string,
    image?: string,
    content?: string
  }
}

type AppAction = {
  type: string,
  payload?: object
}
type DispatchType = (args: AppAction | PostAction | any) => AppAction | PostAction

type IndexObject = { [index: string]: any }

