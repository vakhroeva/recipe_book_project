<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (Category::count() === 0) {
            DB::table('categories')->insert([
                ['name' => 'Завтраки'],
                ['name' => 'Обеды'],
                ['name' => 'Ужины'],
                ['name' => 'Десерты'],
            ]);
        }

        if (User::count() === 0) {
            User::create([
                'username' => 'Test',
                'email' => 'test@gmail.com',
                'login' => 'test',
                'password' => Hash::make('123456'),
            ]);
        }
    }
}
