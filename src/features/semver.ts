export function parseVersion(version: string | undefined = '') {
  const regex = /v(?<major>\d+)(\.(?<minor>\d+))?(\.(?<patch>\d+))?$/;
  const { major, minor = '', patch = '' } = regex.exec(version)?.groups ?? {};

  if (!major) return undefined;

  const full = `${major}${minor === '' ? '' : `.${minor}`}${patch === '' ? '' : `.${patch}`}`;
  return {
    major,
    minor,
    patch,
    full,
    prefixed: `v${full}` satisfies `v${string}`,
  };
}

/**
 * @Returns
 * One of:
 * - a negative number if `a` is less than `b`
 * - a positive number if `a` is greater than `b`
 * - 0 if they are equal.
 */
export function compareVersion(
  a: ReturnType<typeof parseVersion>,
  b: ReturnType<typeof parseVersion>,
) {
  switch (true) {
    case !b?.major || b.major === '0':
      return !a?.major || a.major === '0' ? 0 : 1;
    case !a?.major || a.major === '0':
      return -1;
    case a!.major !== b!.major:
      return Number.parseInt(a.major, 10) - Number.parseInt(b.major, 10);
    case a!.minor !== b!.minor:
      return Number.parseInt(a.minor, 10) - Number.parseInt(b.minor, 10);
    case a!.patch !== b!.patch:
      return Number.parseInt(a.patch, 10) - Number.parseInt(b.patch, 10);
    default:
      return 0;
  }
}
