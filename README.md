# Laravel Nova CEP AutoComplete

Adaptado a partir de [sereny/nova-cep](https://github.com/serenysoft/nova-cep) para funcionar apenas como consulta, sem a necessidade de tabela de endereços.



## Installation

You can install the package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require diego-drese/nova-cep
```

```php
...............

    public function fields(NovaRequest $request)
    {
        return [
        
        .................
        
            Cep::make("Cep", "cep")
                ->required(),

            Text::make("Endereço", "endereco")
                ->rules('required'),

            Text::make("Número", "numero")
                ->rules('required'),

            Text::make("Complemento", 'complemento')
                ->rules('required'),
                
            Text::make("Bairro", 'bairro')
            ->rules('required'),
            
            Text::make("Cidade", 'cidade')
                ->rules('required'),
                
            Text::make("Estado", 'estado')
            ->rules('required'),

        .................
        ];
    }
.........................
