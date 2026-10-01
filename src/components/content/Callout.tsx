import type { ReactNode } from 'react';
import { AlertTriangle, Info, Lightbulb, MessageSquareText, XCircle } from 'lucide-react';
import { cn } from '../layout/classNames';

export type CalloutRole = 'info' | 'tip' | 'warning' | 'mistake' | 'interview';

type CalloutProps = {
  children: ReactNode;
  role?: CalloutRole;
  title?: string;
  icon?: ReactNode;
  className?: string;
};

const roleStyles: Record<CalloutRole, { icon: typeof Info; shell: string; iconColor: string }> = {
  info: { icon: Info, shell: 'border-[var(--lma-info-border)] bg-[var(--lma-info-soft)]', iconColor: 'text-[var(--lma-info)]' },
  tip: { icon: Lightbulb, shell: 'border-[var(--lma-warning-border)] bg-[var(--lma-warning-soft)]', iconColor: 'text-[var(--lma-warning-text)]' },
  warning: { icon: AlertTriangle, shell: 'border-[var(--lma-warning-border)] bg-[var(--lma-warning-soft)]', iconColor: 'text-[var(--lma-warning-text)]' },
  mistake: { icon: XCircle, shell: 'border-[var(--lma-danger-border)] bg-[var(--lma-danger-soft)]', iconColor: 'text-[var(--lma-danger-text)]' },
  interview: { icon: MessageSquareText, shell: 'border-[var(--lma-brand-border)] bg-[var(--lma-brand-soft)]', iconColor: 'text-[var(--lma-brand)]' },
};

export function Callout({ children, role = 'info', title, icon, className }: CalloutProps) {
  const style = roleStyles[role];
  const Icon = style.icon;

  return (
    <aside
      role="note"
      data-callout-role={role}
      className={cn(
        'not-prose flex items-start gap-3 rounded-xl border p-4 text-sm leading-relaxed text-[var(--lma-text-secondary)] sm:p-5',
        style.shell,
        className,
      )}
    >
      <span className={cn('mt-0.5 shrink-0', style.iconColor)} aria-hidden="true">
        {icon ?? <Icon className="h-5 w-5" />}
      </span>
      <div className="min-w-0 flex-1">
        {title && <p className="mb-1 font-extrabold text-[var(--lma-text-primary)]">{title}</p>}
        <div className="[&_p]:m-0 [&_p+p]:mt-2">{children}</div>
      </div>
    </aside>
  );
}
