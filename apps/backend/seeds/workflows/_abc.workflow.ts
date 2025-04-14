export abstract class _AbcAsyncWorkflow {
  public async run(): Promise<boolean> {
    return true;
  }
}

export abstract class _AbcSyncWorkflow {
  public run(): boolean {
    return true;
  }
}
