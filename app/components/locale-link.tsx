import { Link, useLocation, type LinkProps } from "react-router";

interface LocaleLinkProps extends Omit<LinkProps, "to"> {
  to: string;
}

/**
 * A Link component that automatically adds the current locale prefix to the URL.
 *
 * Usage:
 * - <LocaleLink to="/demos/yagi">Yagi</LocaleLink>
 * - When on /en-US/, this will link to /en-US/demos/yagi
 * - When on /, this will link to /demos/yagi (default locale, no prefix)
 */
export function LocaleLink({ to, children, ...props }: LocaleLinkProps) {
  const location = useLocation();

  // Check if we're currently on a localized route
  const pathSegments = location.pathname.split("/");
  const currentLocale = pathSegments[1];
  const isLocalizedRoute = ["zh-HK", "en-US"].includes(currentLocale);

  // Build the localized path
  let localizedTo = to;
  if (isLocalizedRoute && !to.startsWith(`/${currentLocale}`)) {
    // Add the locale prefix if we're on a localized route
    localizedTo = `/${currentLocale}${to.startsWith("/") ? to : `/${to}`}`;
  }

  return (
    <Link to={localizedTo} {...props}>
      {children}
    </Link>
  );
}
