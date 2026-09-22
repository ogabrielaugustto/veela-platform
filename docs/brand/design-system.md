# Design system Veela

## Objetivo

Esta é a referência de implementação da interface Veela no repositório `dnl-platform`. Os tokens globais vivem em `app/globals.css`; o nome, a descrição e as palavras-chave de SEO vivem em `lib/brand.ts`; o componente de assinatura visual fica em `components/brand-logo.tsx`. Alterações de marca devem atualizar esses pontos centrais e as exceções de página documentadas abaixo.

## Tokens de cor

### Marca

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-primary` / `--primary` | `#2E4156` | Ação principal, texto de marca e foco principal |
| `--color-secondary` / `--secondary` | `#567C8D` | Ação secundária e ênfase de apoio |
| `--color-accent` / `--accent` | `#CDD9E6` | Realce leve e superfícies de seleção |
| `--muted` | `#F5EEEA` | Fundo neutro quente |
| `--chart-3` / neutro | `#AEB7BD` | Gráficos e decoração não textual |

Os tokens são expressos como propriedades CSS compatíveis com Tailwind v4. Componentes devem preferir `bg-primary`, `text-primary`, `bg-secondary`, `bg-muted`, `border-border`, `ring-ring` e os pares semânticos equivalentes, em vez de introduzir novos azuis hexadecimais.

### Superfícies e estados

- Modo claro: fundo branco, texto Navy Blue, cartões claros, Beige e Sky Blue em áreas pontuais.
- Modo escuro: fundo derivado de Navy Blue, cartões mais claros que o fundo, texto claro, Teal Blue e Sky Blue para ênfase.
- Erro, sucesso, alerta, status operacional e gráficos semânticos têm significado próprio. Não os converta em cores de marca; preserve distinção, texto e ícones.
- Verifique contraste em texto, foco visível e controles nos dois temas. Não use Cool Grey em texto pequeno sobre branco sem validar contraste.

## Tipografia

O manual define lettering personalizado para o logotipo, mas não especifica famílias tipográficas para interface. O produto mantém as fontes atualmente carregadas em `app/layout.tsx`, usando a variável `--font-heading` para títulos e `--font-sans` para interface e leitura. Não recrie o lettering da marca como texto. A hierarquia é: título de página, subtítulo/descrição, título de seção, texto de controle e metadados. Preserve legibilidade, line-height confortável e quebras naturais em telas estreitas.

## Logotipo

Use `BrandLogo` de `components/brand-logo.tsx`, que seleciona os arquivos oficiais em `public/`. A versão colorida é para superfícies claras; a branca é para superfícies escuras. Sempre preservar a proporção 4724:1585. Em contextos compactos, ajuste a largura responsivamente; não comprima a logo nem recrie a marca com ícone genérico. Se a aplicação precisar de favicon ou ícone quadrado, solicite/produza um símbolo oficial separado antes de recortar a assinatura horizontal.

## Forma e layout

- Priorize leitura clara, respiro e hierarquia previsível.
- Use os raios existentes do sistema (`--radius` e escalas derivadas) com consistência; não crie raios especiais por componente sem necessidade.
- Prefira fundos sólidos ou variações discretas da paleta; evite gradientes decorativos fortes e sombras que disputem com o conteúdo.
- Mantenha layouts responsivos e controles utilizáveis em telas estreitas.
- Ícones existentes são elementos funcionais, não substitutos do logotipo.

## Conteúdo e acessibilidade

- Escreva em português do Brasil, com frases curtas e ação explícita.
- Diferencie ocorrência, evidência, revisão humana e encaminhamento. Não apresente correspondência como infração automática nem evidência operacional como certeza jurídica.
- Controles precisam de rótulo acessível, estado de foco visível e texto além da cor para comunicar status.
- Não use somente cor para diferenciar autorização, processamento, alerta ou falha.

## SEO e compartilhamento

- `APP_NAME`, `APP_DESCRIPTION` e `APP_KEYWORDS` em `lib/brand.ts` formam os metadados globais.
- Páginas públicas podem substituir título e descrição com conteúdo específico da rota.
- A aplicação configura Open Graph e Twitter Card com a logo aprovada. Não configure URL canônica nem `metadataBase` enquanto o domínio público oficial não estiver confirmado.
- Rotas autenticadas e administrativas não devem ser promovidas como conteúdo de busca; mantenha a indexação restrita às superfícies públicas ao definir metadados por rota.
- Textos SEO devem refletir as funcionalidades reais e evitar garantias de remoção, cobertura ou resultado jurídico.

## Critérios para novas interfaces

1. Usar a paleta por meio dos tokens semânticos globais.
2. Usar a assinatura correta e manter a proporção da logo.
3. Conferir a superfície clara e escura e estados de interação.
4. Confirmar contraste e informação não dependente apenas de cor.
5. Preservar o fluxo de revisão humana e os limites jurídicos do produto.
6. Atualizar este documento quando tokens ou convenções centrais mudarem.
