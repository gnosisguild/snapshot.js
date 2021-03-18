import strategies from '..';

export const author = 'bonustrack';
export const version = '0.1.0';

export async function strategy(
  space,
  network,
  provider,
  addresses,
  options,
  snapshot
) {
  const max = 250;
  const pages = Math.ceil(addresses.length / max);
  const promises = [];
  Array.from(Array(pages)).forEach((x, i) => {
    const addressesInPage = addresses.slice(max * i, max * (i + 1));
    promises.push(
      strategies[options.strategy.name](
        space,
        network,
        provider,
        addressesInPage,
        options.strategy.params,
        snapshot
      )
    );
  });
  const results = await Promise.all(promises);
  return results.reduce((obj, result: any) => ({ ...obj, ...result }), {});
}