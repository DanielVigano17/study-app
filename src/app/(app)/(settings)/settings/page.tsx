'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ApplicationPage, ApplicationPageTitle } from "@/components/page-content/ApplicationPage"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <ApplicationPage pageKey="settings-page" authPage>

        <ApplicationPageTitle>Configurações</ApplicationPageTitle>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>
                Personalize a aparência do seu aplicativo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <Label>Tema</Label>
                  <span className="text-sm text-muted-foreground">
                    Escolha entre tema claro ou escuro
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </ApplicationPage>
  )
}
