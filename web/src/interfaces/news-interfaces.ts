export interface News {
    chapeu: string
    image: string
    section: string
    summary: string
    title: string
    url: string
    video: Video
    group: any[]
    type: string
    created: string
    id: string
  }
  
  export interface Video {
    duration: number
    programTitle: string
    source: string
  }

  export type NewsListResponse = News[];


  export interface NewsGroup {
    header: string
    footer: Footer
    group: Group[]
    type: string
    created: string
    id: string
  }
  
  export interface Footer {
    label: string
    url: string
  }
  
  export interface Group {
    content: Content
    type: string
    id: string
  }
  
  export interface Content {
    title: string
    url: string
  }

  export type NewsGroupResponse = NewsGroup[];
  