<?php

namespace App\Console\Commands;

use App\Helpers\Helper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ProjectInit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Initializing the project with fake data ...';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->comment($this->description);
        $this->info('');

        Artisan::call('cache:clear');
        Artisan::call('route:clear');
        Artisan::call('config:clear');
        Artisan::call('view:clear');
        $this->info('Cache was cleared successfully.');

        Helper::deleteAll(storage_path('app') . '/public/storage');
        $this->info('Old uploaded files were deleted successfully.');

        @mkdir(storage_path('app') . '/public/storage');
        Artisan::call('storage:link');
        $this->info('Symbolic links were created successfully.');

        $this->comment('Creating tables and seeding data ...');
        Artisan::call('migrate:fresh --seed');
        $this->info('Database tables were created successfully.');

        $this->info('');
        $this->info('****');
        $this->line('Username: 09155295009');
        $this->line('Password: 1234');
        $this->info('****');
        $this->info('');

        $this->comment('READY TO GO!');
        $this->info('');

        return Command::SUCCESS;
    }
}
