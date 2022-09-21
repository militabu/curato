export const changeScreen = (value: number) => {
  console.log('Change screen to number:', value);
  return {
    type: 'CHANGE_SCREEN',
    payload: value
  }
}