declare interface JsMindStatic {
  show(options: Record<string, any>, data: any): JsMind
}

declare interface JsMind {
  options: Record<string, any>;
  resize(): void;
  set_theme(): void;
  get_data(format: string): any;
}
