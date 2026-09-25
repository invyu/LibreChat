import { getProwessCodeOutput } from './prowess';

describe('getProwessCodeOutput', () => {
  it('accepts only complete generated-file references', () => {
    expect(
      getProwessCodeOutput({
        id: 'chat-1',
        prowess_files: [{ id: 'file-1', name: 'report.pdf', storage_session_id: 'store-1' }],
      }),
    ).toEqual({
      toolCallId: 'chat-1',
      files: [{ id: 'file-1', name: 'report.pdf', storage_session_id: 'store-1' }],
    });
    expect(getProwessCodeOutput({ id: 'chat-1', prowess_files: [{ id: 'file-1' }] })).toBeNull();
    expect(getProwessCodeOutput({ id: 'chat-1', prowess_files: [] })).toBeNull();
  });
});
