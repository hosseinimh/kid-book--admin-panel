<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class Push extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'push {message?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pushing to github repository ...';

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
        $message = $this->argument('message');
        $this->info('');

        (new Process(['cmd /c git add .']))->run();
        $message ?
            (new Process(['cmd /c git commit -m ' . $message]))->run()
            : (new Process(['cmd /c git commit -m fix_update']))->run();
        (new Process(['cmd /c git push -u origin main']))->run();

        $this->info('Pushed to github repository!');
        return Command::SUCCESS;
    }
}
