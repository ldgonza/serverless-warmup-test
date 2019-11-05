export const handler = async (event, context, callback) => {
  let warmup = event.source === 'warmup';
  if (warmup) console.log('WarmUp' + event.number);

  if (warmup) {
    let time = 500;
    await new Promise(r => setTimeout(r, time));
    return "DONE";
  }
  
  return "DONE";
};
