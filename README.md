# Laravel Nova CEP Field

A Laravel Nova field enables automatic address data completion by CEP lookup.

## Installation

You can install the package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require sereny/nova-cep-old
```

![example](/.github/images/example.gif)

## Usage

### Create migration:

`php artisan make:migration create_addresses_table`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id('id')->primary();
            $table->foreignId('owner')->constrained()->cascadeOnDelete();
            $table->string('postcode');
            $table->string('street');
            $table->string('details')->nullable();
            $table->string('district')->nullable();
            $table->string('number')->nullable();
            $table->json('city');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
    }
};
```

### Run migration

`php artisan migrate`

### Create the `Address` resource

`php artisan nova:resource Address`

```php
<?php

namespace App\Nova;

use Laravel\Nova\Fields\Hidden;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use DiegoDrese\NovaCep\Fields\Cep;

class Address extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\Address>
     */
    public static $model = \App\Models\Address::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'street';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'street',
        'postcode',
        'district'
    ];

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @return array
     */
    public function fields(NovaRequest $request)
    {
        return [
            Cep::make(__('Postcode'), 'postcode')
                ->required(),

            Text::make(__('Street'), 'street')
                ->rules('required'),

            Text::make(__('Number'), 'number')
                ->rules('required'),

            Text::make(__('District'), 'district')
                ->rules('required'),

            Text::make(__('Reference'), 'details')
                ->hideFromIndex(),

            Hidden::make('city')// This is necessary because `city` field must be `readonly`
                ->fillUsing(function ($request, $model, $attribute) {
                    [$name, $state] = explode(' - ', $request->input($attribute));
                    $model->city = ['name' => $name, 'state' => $state];
                }),

            Text::make(__('City'), 'city')
                ->readonly()
                ->resolveUsing(function ($value) {
                    return $value ?  "{$value['name']} - {$value['state']}" : null;
                }),
        ];
    }
}
```
