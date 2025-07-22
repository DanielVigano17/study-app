import { ApplicationPage, ApplicationPageTitle } from "@/components/page-content/ApplicationPage"
import SettingsContent from "./_components/SettingsContent"

export default function SettingsPage() {

  return (
    <ApplicationPage pageKey="settings-page" authPage>
        <ApplicationPageTitle>Configurações</ApplicationPageTitle>
        <SettingsContent />
    </ApplicationPage>
  )
}
