import { SettingsView } from '@/src/presentation/components/settings/SettingsView';
import { createServerSettingsPresenter } from '@/src/presentation/presenters/settings/SettingsPresenterServerFactory';

/**
 * Settings Page - Server Component
 */
export default async function SettingsPage() {
  const presenter = createServerSettingsPresenter();
  const viewModel = await presenter.getViewModel();

  return <SettingsView initialViewModel={viewModel} />;
}
