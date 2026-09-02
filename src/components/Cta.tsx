import styled from 'styled-components'
import { APP_STORE_URL, IS_ON_THE_APP_STORE } from '../lib/site'

/**
 * The download call to action, and the only filled control on the page.
 *
 * Two states, and they are deliberately not the same weight. Live, this is the
 * thing everybody came to press, so it takes the accent fill and the ink that
 * pairs with it. Before the app is approved there is nothing to press, so it
 * drops to an outline and stops looking like a promise it cannot keep.
 *
 * It appears three times: in the header, under the headline, and again at the
 * bottom, because a reader who is convinced by the last section should not have
 * to scroll back up to act on it.
 */

const Button = styled.a<{ $live: boolean; $size: 'sm' | 'lg' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.s2};
  padding: ${({ theme, $size }) =>
    $size === 'lg' ? `${theme.space.s4} ${theme.space.s8}` : `${theme.space.s2} ${theme.space.s5}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $live }) => ($live ? theme.color.accent : 'transparent')};
  border: 1px solid ${({ theme, $live }) => ($live ? 'transparent' : theme.color.border)};
  color: ${({ theme, $live }) => ($live ? theme.color.ink : theme.color.textSecondary)};
  font-size: ${({ $size }) => ($size === 'lg' ? '1.0625rem' : '0.9375rem')};
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.15s ease;

  &:hover {
    transform: ${({ $live }) => ($live ? 'translateY(-1px)' : 'none')};
  }
`

export function Cta({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  if (IS_ON_THE_APP_STORE) {
    return (
      <Button href={APP_STORE_URL} $live $size={size}>
        Download on the App Store
      </Button>
    )
  }
  // Not a link, and not a disabled one either: there is nothing to go to yet,
  // so it states the fact and stays out of the tab order.
  return (
    <Button as="p" $live={false} $size={size}>
      Coming to the App Store
    </Button>
  )
}
