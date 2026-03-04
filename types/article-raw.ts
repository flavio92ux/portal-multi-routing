export interface ArticleRaw {
  _id: string
  route: Route
  config: Config7
  status: number
  url: string
  createdAt: string
  updatedAt: string
  dtAgendamento: string
  id: string
  "@created": string
  "@updated": string
}

export interface Route {
  title: string
  map: Map
}

export interface Map {
  name: string
  domain: string
  matcher: string
  modelFilter: string
  template: Template
  customFormat: string
  channel: Channel
  status: number
  _id: string
}

export interface Template {
  name: string
  url: string
  breadcrumb: Breadcrumb
  config: Config
  _id: string
}

export interface Breadcrumb {
  name: string
  url: string
}

export interface Config {
  order: Order[]
  seo: Seo
  theme: Theme
  audience: Audience
  publicidade: Publicidade
  general: General
}

export interface Order {
  data: Data
}

export interface Data {
  component: string
  menuCMS?: MenuCms
  menuId?: number
  logo?: Logo
  logoMain?: LogoMain
  _name: string
  ids?: Ids
  extra?: Extra
  format?: string
  slot?: Slot
}

export interface MenuCms {
  name: string
  slug: string
  minified: Minified[]
  secondary: Secondary[]
  share: Share[]
  _id: string
}

export interface Minified {
  title: string
  link: string
}

export interface Secondary {
  title: string
  link: string
  live: boolean
}

export interface Share {
  link: string
  social: string
}

export interface Logo {
  link: string
  tagNameTitle: string
  name: string
}

export interface LogoMain {
  link: string
  name: string
  channel: string
  image: Image
}

export interface Image {
  _id: string
  title: string
  filter: string
  credit: string
  url: string
  hash: string
  width: number
  height: number
  created_at: string
  updated_at: string
  urlCrop: string
  urlStr: string
  created_str: string
  uploadVibra: boolean
}

export interface Ids {
  mobile: string
  web?: string
}

export interface Extra {
  customTargetings: CustomTargetings
}

export interface CustomTargetings {
  pos: string
}

export interface Slot {
  J: J[]
  C: C[]
  E: E[]
  F: F[]
  D: D[]
  G: G[]
  recipeA: RecipeA[]
  recipeB: RecipeB[]
  recipeC: RecipeC[]
  videoA: VideoA[]
}

export interface J {
  data: Data2
}

export interface Data2 {}

export interface C {
  data: Data3
}

export interface Data3 {
  component: string
  opts: Opts
  _name: string
}

export interface Opts {
  social: string[]
}

export interface E {
  data: Data4
}

export interface Data4 {
  component: string
  config?: Config2
  _name: string
  content?: Content
}

export interface Config2 {
  title: Title
  type: string
  layout: Layout
  limit: number
}

export interface Title {
  component: string
  name: string
  tagNameTitle: string
}

export interface Layout {
  date: boolean
  banner: boolean
  related: boolean
}

export interface Content {
  channel: string
  icon: string
  title: string
  subTitle: string
  success: Success
  btn: string
  innerPage: boolean
}

export interface Success {
  title: string
  subTitle: string
}

export interface F {
  data: Data5
}

export interface Data5 {
  component: string
  ids?: Ids2
  _name: string
  title?: Title2
  channel?: string
  domain?: string
  limit?: number
  layout?: Layout2
}

export interface Ids2 {
  web: string
}

export interface Title2 {
  component: string
  name: string
  tagNameTitle: string
}

export interface Layout2 {
  sidebar: boolean
}

export interface D {
  data: Data6
}

export interface Data6 {
  component: string
  limit?: number
  tags?: Tag[]
  _name: string
  config?: Config3
}

export interface Tag {
  id: string
  name: string
  type: string
  id_uolmais: string
  priority: number
  _id: string
}

export interface Config3 {
  title: Title3
  type: string
  layout: Layout3
  limit: number
}

export interface Title3 {
  component: string
  name: string
  tagNameTitle: string
}

export interface Layout3 {
  date: boolean
  paginacao: boolean
  banner: boolean
  list: boolean
}

export interface G {
  data: Data7
}

export interface Data7 {
  component: string
  items: Item[]
  _name: string
}

export interface Item {
  label: string
  share: string
}

export interface RecipeA {
  data: Data8
}

export interface Data8 {}

export interface RecipeB {
  data: Data9
}

export interface Data9 {}

export interface RecipeC {
  data: Data10
}

export interface Data10 {}

export interface VideoA {
  data: Data11
}

export interface Data11 {}

export interface Seo {
  title: string
  description: string
  image: Image2
  og: Og[]
}

export interface Image2 {
  _id: string
  title: string
  filter: string
  credit: string
  url: string
  hash: string
  width: number
  height: number
  created_at: string
  updated_at: string
  urlCrop: string
  urlStr: string
  created_str: string
  uploadVibra: boolean
}

export interface Og {
  property: string
  content: string
}

export interface Theme {
  title: string
  css: Css[]
  status: number
  _id: string
}

export interface Css {
  key: string
  value: string
}

export interface Audience {
  base_url: string
  props: Prop[]
}

export interface Prop {
  key: string
  value: string
}

export interface Publicidade {
  slot: string
}

export interface General {
  tagId: number
}

export interface Channel {
  name: string
  label: string
  shortLabel: string
  models: Model[]
  _id: string
}

export interface Model {
  fields: Fields
  name: string
  admin: Admin
  _id: string
}

export interface Fields {
  route: Route2
  config: Config4
  status: Status
  url: Url
  createdAt?: CreatedAt
  updatedAt?: UpdatedAt
  dtAgendamento?: DtAgendamento
  schedule?: Schedule
  linkExterno?: LinkExterno
  pushNotification?: PushNotification
}

export interface Route2 {
  label: string
  hideTitle: boolean
  style: Style
  type: string
  fields: Fields2
  classe: string
  layout: string
  index?: boolean
}

export interface Style {
  cols: number
}

export interface Fields2 {
  title: Title4
  map: Map2
}

export interface Title4 {
  label: string
  required: boolean
  hint: string
  noIndexPriv?: boolean
  style: Style2
  type: string
  index?: boolean
}

export interface Style2 {
  cols: number
}

export interface Map2 {
  label: string
  required: boolean
  hint?: string
  style: Style3
  type: string
  model: string
  channel: string
  filter: string
  search: Search[]
  searchable?: boolean
}

export interface Style3 {
  cols: number
}

export interface Search {
  name: string
  value: string
}

export interface Config4 {
  label?: string
  hideTitle?: boolean
  index?: boolean
  searchable?: boolean
  style: Style4
  type: string
  fields: Fields3
  layout: string
  areas: string[]
  exclusive?: boolean
  noIndexPriv?: boolean
}

export interface Style4 {
  cols: number
}

export interface Fields3 {
  order: Order2
  seo: Seo2
  live?: Live
  publicidade?: Publicidade2
  audience?: Audience2
}

export interface Order2 {
  label: string
  hideTitle?: boolean
  index?: boolean
  searchable?: boolean
  style: Style5
  type: string
  from: string
  layout: string
  exclusive?: boolean
  multiple?: boolean
}

export interface Style5 {
  cols: number
}

export interface Seo2 {
  label?: string
  index?: boolean
  searchable?: boolean
  area: number
  style: Style6
  type: string
  from: string
  layout: string
}

export interface Style6 {
  cols: number
}

export interface Live {
  intro: string
  index: boolean
  area: number
  style: Style7
  type: string
  fields: Fields4
}

export interface Style7 {
  cols: number
}

export interface Fields4 {
  slogan: Slogan
}

export interface Slogan {
  index: boolean
  style: Style8
  type: string
  from: string
}

export interface Style8 {
  cols: number
}

export interface Publicidade2 {
  area: number
  style: Style9
  type: string
  from: string
  layout: string
}

export interface Style9 {
  cols: number
}

export interface Audience2 {
  area: number
  style: Style10
  type: string
  from: string
  layout: string
}

export interface Style10 {
  cols: number
}

export interface Status {
  label: string
  hidden: boolean
  type: string
}

export interface Url {
  label: string
  hidden: boolean
  index: boolean
  searchable: boolean
  style: Style11
  type: string
  format: string
  customFormat: string
  private?: boolean
}

export interface Style11 {
  cols: number
}

export interface CreatedAt {
  label: string
  hidden: boolean
  index: boolean
  searchable: boolean
  type: string
  now: string
  subType: string
}

export interface UpdatedAt {
  hidden: boolean
  index: boolean
  searchable: boolean
  type: string
  now: string
  subType: string
}

export interface DtAgendamento {
  hidden: boolean
  index: boolean
  searchable: boolean
  type: string
  subType: string
  now?: string
}

export interface Schedule {
  hidden: boolean
  type: string
  model: string
  channel: string
  filter: string
  inline: boolean
}

export interface LinkExterno {
  label: string
  index: boolean
  searchable: boolean
  style: Style12
  type: string
}

export interface Style12 {
  cols: number
}

export interface PushNotification {
  hidden: boolean
  noIndexPriv: boolean
  type: string
  model: string
  channel: string
  filter: string
  inline: boolean
}

export interface Admin {
  label: string
  listDisplay: string[]
  listFilter: string[]
  plugins: Plugin[]
  elasticMappings: ElasticMappings
}

export interface Plugin {
  name: string
  config?: Config5
  area?: number
}

export interface Config5 {
  url?: string
  title?: string
  web?: string
  mobile?: string
  type?: string
}

export interface ElasticMappings {
  properties: Properties
}

export interface Properties {
  _parent: Parent
  route?: Route3
  config: Config6
}

export interface Parent {
  type: string
}

export interface Route3 {
  type: string
}

export interface Config6 {
  type: string
}

export interface Config7 {
  order: Order3
  seo: Seo3
  live: Live2
}

export interface Order3 {
  component: string
  data: Data12
}

export interface Data12 {
  title: string
  subTitle: string
  editorias: Editoria[]
  tags: Tag2[]
  redactor: string
  text: string
  image: Image3
  imageRepresentativeType: string
}

export interface Editoria {
  id: string
  name: string
  type: string
  priority: string
  _id: string
}

export interface Tag2 {
  id: string
  name: string
  type: string
  priority: any
  createdAt?: string
  _id: string
}

export interface Image3 {
  title: string
  filter: string
  credit: string
  url: string
  hash: string
  width: number
  height: number
  _id: string
  created_at: string
  updated_at: string
  uploadVibra: boolean
  urlCrop: string
}

export interface Seo3 {
  title: string
  description: string
  image: Image4
  robots: string
}

export interface Image4 {
  _id: string
  title: string
  filter: string
  credit: string
  url: string
  hash: string
  width: number
  height: number
  created_at: string
  updated_at: string
  urlCrop: string
  urlStr: string
  created_str: string
  uploadVibra: boolean
}

export interface Live2 {
  slogan: Slogan2
}

export interface Slogan2 {
  component: string
}
