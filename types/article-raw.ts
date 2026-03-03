export interface ArticleRaw {
  _id: string;
  route: Route;
  config: Config7;
  status: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  dtAgendamento: string;
  id: string;
  '@created': string;
  '@updated': string;
}

export interface Route {
  title: string;
  map: Map;
}

export interface Map {
  name: string;
  domain: string;
  matcher: string;
  modelFilter: string;
  template: Template;
  customFormat: string;
  channel: Channel;
  status: number;
  _id: string;
}

export interface Template {
  name: string;
  url: string;
  breadcrumb: Breadcrumb;
  config: Config;
  _id: string;
}

export interface Breadcrumb {
  name: string;
  url: string;
}

export interface Config {
  order: Order[];
  seo: Seo;
  theme: Theme;
  audience: Audience;
  publicidade: Publicidade;
  general: General;
}

export interface Order {
  data: Data;
}

export interface Data {
  component: string;
  menuCMS?: MenuCms;
  menuId?: number;
  logo?: Logo;
  logoMain?: LogoMain;
  _name: string;
  ids?: Ids;
  extra?: Extra;
  noCount?: NoCount;
  format?: string;
  slot?: Slot;
  sticky?: string;
}

export interface MenuCms {
  name: string;
  slug: string;
  minified: Minified[];
  share: Share[];
  _id: string;
}

export interface Minified {
  title: string;
  link: string;
}

export interface Share {
  link: string;
  social: string;
}

export interface Logo {
  link: string;
  tagNameTitle: string;
  name: string;
}

export interface LogoMain {
  link: string;
  name: string;
  channel: string;
  image: Image;
}

export interface Image {
  _id: string;
  title: string;
  filter: string;
  credit: string;
  url: string;
  hash: string;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
  urlCrop: string;
  urlStr: string;
  created_str: string;
  uploadVibra: boolean;
}

export interface Ids {
  mobile: string;
  web?: string;
}

export interface Extra {
  customTargetings: CustomTargetings;
}

export interface CustomTargetings {
  pos: string;
}

export interface NoCount {
  web: boolean;
  mobile: boolean;
}

export interface Slot {
  C: C[];
  E: E[];
  F: F[];
  D: D[];
  G: G[];
}

export interface C {
  data: Data3;
}

export interface Data3 {
  component: string;
  opts: Opts;
  _name: string;
}

export interface Opts {
  social: string[];
}

export interface E {
  data: Data4;
}

export interface Data4 {
  component: string;
  web?: Web;
  mobile?: Mobile;
  _name: string;
  config?: Config2;
  content?: Content;
  innerPage?: boolean;
}

export interface Web {
  image: Image2;
  link: string;
}

export interface Image2 {
  _id: string;
  title: string;
  filter: string;
  credit: string;
  url: string;
  hash: string;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
  urlCrop: string;
  urlStr: string;
  created_str: string;
  uploadVibra: boolean;
}

export interface Mobile {
  image: Image3;
  link: string;
}

export interface Image3 {
  _id: string;
  title: string;
  filter: string;
  credit: string;
  url: string;
  hash: string;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
  urlCrop: string;
  urlStr: string;
  created_str: string;
  uploadVibra: boolean;
}

export interface Config2 {
  title: Title;
  type: string;
  layout: Layout;
  editorias: string[];
  tags: string[];
  limit: number;
}

export interface Title {
  component: string;
  name: string;
  tagNameTitle: string;
}

export interface Layout {
  date: boolean;
  banner: boolean;
  related: boolean;
}

export interface Content {
  name: string;
  title: string;
  subTitle: string;
  themeLabel: string;
  themes: string[];
  success: Success;
  btn: string;
  _id: string;
}

export interface Success {
  title: string;
}

export interface F {
  data: Data5;
}

export interface Data5 {
  component: string;
  ids?: Ids2;
  _name: string;
  title?: Title2;
  channel?: string;
  domain?: string;
  limit?: number;
  layout?: Layout2;
}

export interface Ids2 {
  web: string;
}

export interface Title2 {
  component: string;
  name: string;
  tagNameTitle: string;
}

export interface Layout2 {
  sidebar: boolean;
}

export interface D {
  data: Data6;
}

export interface Data6 {
  component: string;
  limit?: number;
  tags?: Tag[];
  _name: string;
  config?: Config3;
}

export interface Tag {
  id: string;
  name: string;
  type: string;
  id_uolmais: string;
  priority: number;
  _id: string;
}

export interface Config3 {
  title: Title3;
  type: string;
  layout: Layout3;
  editorias: string[];
  limit: number;
}

export interface Title3 {
  component: string;
  name: string;
  tagNameTitle: string;
}

export interface Layout3 {
  paginacao: boolean;
  banner: boolean;
  list: boolean;
}

export interface G {
  data: Data7;
}

export interface Data7 {
  component: string;
  items: Item[];
  _name: string;
}

export interface Item {
  label: string;
  share: string;
}

export interface Seo {
  title: string;
  description: string;
  image: Image4;
  og: Og[];
}

export interface Image4 {
  _id: string;
  title: string;
  filter: string;
  credit: string;
  url: string;
  hash: string;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
  urlCrop: string;
  urlStr: string;
  created_str: string;
  uploadVibra: boolean;
}

export interface Og {
  property: string;
  content: string;
}

export interface Theme {
  title: string;
  id: string;
  css: Css[];
  status: number;
  _id: string;
}

export interface Css {
  key: string;
  value: string;
}

export interface Audience {
  base_url: string;
  props: Prop[];
}

export interface Prop {
  key: string;
  value: string;
}

export interface Publicidade {
  slot: string;
}

export interface General {
  tagId: number;
}

export interface Channel {
  name: string;
  label: string;
  shortLabel: string;
  models: Model[];
  _id: string;
}

export interface Model {
  fields: Fields;
  name: string;
  admin: Admin;
  _id: string;
}

export interface Fields {
  id?: Id;
  name?: Name;
  type?: Type;
  link?: Link;
  image?: Image5;
  id_uolmais?: IdUolmais;
  priority?: Priority;
  createdAt?: CreatedAt;
  route?: Route2;
  url?: Url;
  config?: Config4;
  status?: Status;
  biography?: Biography;
  biographySummary?: BiographySummary;
  order?: Order3;
  linkColumn?: LinkColumn;
  linkPresenter?: LinkPresenter;
  linkSpreaker?: LinkSpreaker;
  linkApi?: LinkApi;
  contentType?: ContentType;
  social?: Social;
  topBlog?: TopBlog;
  modelHome?: ModelHome;
  contentList?: ContentList;
  playListShiva?: PlayListShiva;
  updatedAt?: UpdatedAt;
  dtAgendamento?: DtAgendamento;
  schedule?: Schedule;
  linkExterno?: LinkExterno;
  pushNotification?: PushNotification;
  title?: Title5;
  redirects?: Redirects;
  breadcrumb?: Breadcrumb2;
}

export interface Id {
  hint?: string;
  hidden: boolean;
  index: boolean;
  searchable: boolean;
  style: Style;
  type: string;
  format: string;
  customFormat: string;
  label?: string;
}

export interface Style {
  cols: number;
}

export interface Name {
  label: string;
  required?: boolean;
  index?: boolean;
  style: Style2;
  type: string;
  searchable?: boolean;
}

export interface Style2 {
  cols: number;
}

export interface Type {
  subType: string;
  label: string;
  required: boolean;
  index: boolean;
  type: string;
  options: Option[];
  style?: Style3;
}

export interface Option {
  name: string;
  value: string;
}

export interface Style3 {
  cols: number;
}

export interface Link {
  label: string;
  required?: boolean;
  style: Style4;
  type: string;
  index?: boolean;
  searchable?: boolean;
}

export interface Style4 {
  cols: number;
}

export interface Image5 {
  label: string;
  style: Style5;
  type: string;
  required?: boolean;
  index?: boolean;
  hint?: string;
}

export interface Style5 {
  cols: number;
}

export interface IdUolmais {
  hidden: boolean;
  index: boolean;
  searchable: boolean;
  style: Style6;
  type: string;
}

export interface Style6 {
  cols: number;
}

export interface Priority {
  label: string;
  default: string;
  index: boolean;
  type: string;
  subType: string;
  step: number;
  minLength: number;
  maxLength: number;
}

export interface CreatedAt {
  label: string;
  hidden: boolean;
  index?: boolean;
  searchable?: boolean;
  type: string;
  now: string;
  subType: string;
}

export interface Route2 {
  label: string;
  hideTitle: boolean;
  style: Style7;
  type: string;
  fields: Fields2;
  classe: string;
  layout: string;
  index?: boolean;
}

export interface Style7 {
  cols: number;
}

export interface Fields2 {
  title: Title4;
  map: Map2;
}

export interface Title4 {
  label: string;
  required: boolean;
  hint: string;
  noIndexPriv?: boolean;
  style: Style8;
  type: string;
  index?: boolean;
}

export interface Style8 {
  cols: number;
}

export interface Map2 {
  label: string;
  required: boolean;
  hint?: string;
  searchable?: boolean;
  style: Style9;
  type: string;
  model: string;
  channel: string;
  filter: string;
  search: Search[];
}

export interface Style9 {
  cols: number;
}

export interface Search {
  name: string;
  value: string;
}

export interface Url {
  label: string;
  index?: boolean;
  searchable?: boolean;
  style: Style10;
  type: string;
  format: string;
  customFormat: string;
  hidden?: boolean;
  private?: boolean;
}

export interface Style10 {
  cols: number;
}

export interface Config4 {
  index?: boolean;
  searchable?: boolean;
  style: Style11;
  type: string;
  fields: Fields3;
  layout: string;
  areas: string[];
  label?: string;
  hideTitle?: boolean;
  exclusive?: boolean;
  noIndexPriv?: boolean;
}

export interface Style11 {
  cols: number;
}

export interface Fields3 {
  order: Order2;
  seo: Seo2;
  theme?: Theme2;
  removeBarraUol?: RemoveBarraUol;
  audience?: Audience2;
  publicidade?: Publicidade2;
  general?: General2;
  live?: Live;
}

export interface Order2 {
  label: string;
  multiple?: boolean;
  style: Style12;
  type: string;
  from: string;
  layout: string;
  hideTitle?: boolean;
  index?: boolean;
  searchable?: boolean;
  exclusive?: boolean;
}

export interface Style12 {
  cols: number;
}

export interface Seo2 {
  label?: string;
  area: number;
  style: Style13;
  type: string;
  from: string;
  layout: string;
  index?: boolean;
  searchable?: boolean;
}

export interface Style13 {
  cols: number;
}

export interface Theme2 {
  label: string;
  index: boolean;
  searchable: boolean;
  area: number;
  style: Style14;
  type: string;
  model: string;
  channel: string;
  filter: string;
}

export interface Style14 {
  cols: number;
}

export interface RemoveBarraUol {
  label: string;
  area: number;
  style: Style15;
  type: string;
}

export interface Style15 {
  cols: number;
}

export interface Audience2 {
  area: number;
  style: Style16;
  type: string;
  from: string;
  layout: string;
}

export interface Style16 {
  cols: number;
}

export interface Publicidade2 {
  area: number;
  style: Style17;
  type: string;
  from: string;
  layout: string;
}

export interface Style17 {
  cols: number;
}

export interface General2 {
  label: string;
  area: number;
  style: Style18;
  type: string;
  fields: Fields4;
}

export interface Style18 {
  cols: number;
}

export interface Fields4 {
  json: Json;
  tagId: TagId;
}

export interface Json {
  label: string;
  style: Style19;
  type: string;
}

export interface Style19 {
  cols: number;
}

export interface TagId {
  label: string;
  hint: string;
  type: string;
  subType: string;
}

export interface Live {
  intro: string;
  index: boolean;
  area: number;
  style: Style20;
  type: string;
  fields: Fields5;
}

export interface Style20 {
  cols: number;
}

export interface Fields5 {
  slogan: Slogan;
}

export interface Slogan {
  index: boolean;
  style: Style21;
  type: string;
  from: string;
}

export interface Style21 {
  cols: number;
}

export interface Status {
  label: string;
  hidden: boolean;
  type: string;
}

export interface Biography {
  label: string;
  index: boolean;
  style: Style22;
  type: string;
  editor: string;
}

export interface Style22 {
  cols: number;
}

export interface BiographySummary {
  label: string;
  index: boolean;
  type: string;
}

export interface Order3 {
  label: string;
  hidden: boolean;
  type: string;
  subType: string;
}

export interface LinkColumn {
  label: string;
  index: boolean;
  searchable: boolean;
  type: string;
}

export interface LinkPresenter {
  label: string;
  index: boolean;
  type: string;
}

export interface LinkSpreaker {
  label: string;
  type: string;
}

export interface LinkApi {
  label: string;
  hidden: boolean;
  index: boolean;
  type: string;
}

export interface ContentType {
  subType: string;
  inline: boolean;
  multiple: boolean;
  index: boolean;
  type: string;
  options: Option2[];
}

export interface Option2 {
  name: string;
  value: string;
}

export interface Social {
  label: string;
  multiple: boolean;
  index: boolean;
  style: Style23;
  type: string;
  fields: Fields6;
  classe: string;
  layout: string;
  listDisplay: string[];
}

export interface Style23 {
  cols: number;
}

export interface Fields6 {
  type: Type2;
  url: Url2;
}

export interface Type2 {
  subType: string;
  label: string;
  index: boolean;
  style: Style24;
  type: string;
  options: Option3[];
}

export interface Style24 {
  cols: number;
}

export interface Option3 {
  name: string;
  value: string;
}

export interface Url2 {
  label: string;
  index: boolean;
  style: Style25;
  type: string;
}

export interface Style25 {
  cols: number;
}

export interface TopBlog {
  label: string;
  hidden: boolean;
  style: Style26;
  type: string;
  subType: string;
  options: Option4[];
}

export interface Style26 {
  cols: number;
}

export interface Option4 {
  name: string;
  value: string;
}

export interface ModelHome {
  label: string;
  hidden: boolean;
  style: Style27;
  type: string;
  subType: string;
  options: Option5[];
}

export interface Style27 {
  cols: number;
}

export interface Option5 {
  name: string;
  value: string;
}

export interface ContentList {
  label: string;
  hidden: boolean;
  style: Style28;
  type: string;
  subType: string;
  options: Option6[];
}

export interface Style28 {
  cols: number;
}

export interface Option6 {
  name: string;
  value: string;
}

export interface PlayListShiva {
  type: string;
}

export interface UpdatedAt {
  hidden: boolean;
  index: boolean;
  searchable: boolean;
  type: string;
  now: string;
  subType: string;
}

export interface DtAgendamento {
  hidden: boolean;
  index: boolean;
  searchable: boolean;
  type: string;
  subType: string;
  now?: string;
}

export interface Schedule {
  hidden: boolean;
  type: string;
  model: string;
  channel: string;
  filter: string;
  inline: boolean;
}

export interface LinkExterno {
  label: string;
  index: boolean;
  searchable: boolean;
  style: Style29;
  type: string;
}

export interface Style29 {
  cols: number;
}

export interface PushNotification {
  hidden: boolean;
  noIndexPriv: boolean;
  type: string;
  model: string;
  channel: string;
  filter: string;
  inline: boolean;
}

export interface Title5 {
  label: string;
  required: boolean;
  style: Style30;
  type: string;
}

export interface Style30 {
  cols: number;
}

export interface Redirects {
  label: string;
  multiple: boolean;
  style: Style31;
  type: string;
  fields: Fields7;
  listDisplay: string[];
}

export interface Style31 {
  cols: number;
}

export interface Fields7 {
  title: Title6;
  to: To;
  from: From;
}

export interface Title6 {
  label: string;
  style: Style32;
  type: string;
}

export interface Style32 {
  cols: number;
}

export interface To {
  label: string;
  style: Style33;
  type: string;
}

export interface Style33 {
  cols: number;
}

export interface From {
  label: string;
  style: Style34;
  type: string;
}

export interface Style34 {
  cols: number;
}

export interface Breadcrumb2 {
  label: string;
  index: boolean;
  style: Style35;
  type: string;
  fields: Fields8;
  layout: string;
}

export interface Style35 {
  cols: number;
}

export interface Fields8 {
  name: Name2;
  url: Url3;
}

export interface Name2 {
  label: string;
  required: boolean;
  hint: string;
  index: boolean;
  style: Style36;
  type: string;
}

export interface Style36 {
  cols: number;
}

export interface Url3 {
  label: string;
  required: boolean;
  index: boolean;
  style: Style37;
  type: string;
}

export interface Style37 {
  cols: number;
}

export interface Admin {
  label: string;
  listDisplay: string[];
  listFilter?: string[];
  searchFields?: string[];
  plugins?: Plugin[];
  elasticMappings?: ElasticMappings;
  layout?: string;
  grid?: string;
}

export interface Plugin {
  name: string;
  area?: number;
  config?: Config5;
}

export interface Config5 {
  channel?: string;
  model?: string;
  url?: string;
  title?: string;
  web?: string;
  mobile?: string;
  type?: string;
}

export interface ElasticMappings {
  properties: Properties;
}

export interface Properties {
  config?: Config6;
  _parent?: Parent;
  route?: Route3;
  search_text?: SearchText;
}

export interface Config6 {
  type: string;
}

export interface Parent {
  type: string;
}

export interface Route3 {
  type: string;
}

export interface SearchText {
  type: string;
}

export interface Config7 {
  order: Order4;
  live: Live2;
}

export interface Order4 {
  component: string;
  data: Data12;
}

export interface Data12 {
  title: string;
  subTitle: string;
  editorias: Editoria[];
  tags: Tag2[];
  text: string;
  image: Image6;
  imageRepresentativeType: string;
  textEmbed: string;
  summary: string;
  hasSummary: boolean;
}

export interface Editoria {
  id: string;
  name: string;
  type: string;
  link: string;
  priority: number;
  _id: string;
}

export interface Tag2 {
  id: string;
  name: string;
  type: string;
  link?: string;
  priority: number;
  _id: string;
  createdAt?: string;
}

export interface Image6 {
  title: string;
  filter: string;
  credit: string;
  url: string;
  hash: string;
  width: number;
  height: number;
  _id: string;
  created_at: string;
  updated_at: string;
  uploadVibra: boolean;
  urlCrop: string;
}

export interface Live2 {
  slogan: Slogan2;
}

export interface Slogan2 {
  component: string;
}
