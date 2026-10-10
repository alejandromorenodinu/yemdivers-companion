export function cleanMessage(msg: string) {
  return msg.replace(/<i=\d+>/g, '<b>').replace(/<\/i>/g, '</b>');
}