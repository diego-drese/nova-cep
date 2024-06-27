<?php

namespace Sereny\NovaCep\Fields;

use Laravel\Nova\Fields\Field;
use Laravel\Nova\Fields\SupportsDependentFields;

class Cep extends Field
{
    use SupportsDependentFields;

    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'cep-field';

    /**
     * The attribute map to set address fields.
     *
     * @var array<string, mixed>
     */
    public $meta = [
        'options' => [
            'street' => 'logradouro',
            'details' => 'complemento',
            'district' => 'bairro',
            'city' => ['localidade', 'uf']
        ]
    ];

    public function options($options) {
        return $this->withMeta(compact('options'));
    }
}
