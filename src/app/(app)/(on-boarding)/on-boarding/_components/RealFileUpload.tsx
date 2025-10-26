"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle, AlertCircle, File as FileIcon } from "lucide-react";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { createFileAction } from "../../../app/actions";
import FileService from "@/services/upload-service";
import supabase from "@/lib/supabase-client";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

type RealFileUploadProps = {
    materiaId: string;
    onNext?: (fileUrl: string) => void;
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const RealFileUpload = ({ materiaId, onNext }: RealFileUploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        setError(null);
        setUploadProgress(0);
        setUploadComplete(false);
        
        // Verificar arquivos rejeitados
        if (rejectedFiles.length > 0) {
            const rejectedFile = rejectedFiles[0];
            if (rejectedFile.errors[0]?.code === 'file-invalid-type') {
                toast.error("Apenas arquivos PDF são permitidos!");
                setError("Apenas arquivos PDF são permitidos.");
                return;
            }
        }
        
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            
            // Validação adicional do tipo de arquivo
            if (selectedFile.type !== 'application/pdf') {
                toast.error("Apenas arquivos PDF são permitidos!");
                setError("Apenas arquivos PDF são permitidos.");
                return;
            }
            
            if (selectedFile.size > MAX_FILE_SIZE) {
                toast.error("O arquivo excede o limite de 50MB.");
                setError("O arquivo excede o limite de 50MB.");
            } else {
                setFile(selectedFile);
                toast.success("Arquivo PDF selecionado com sucesso!");
            }
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        maxFiles: 1,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf']
        }
    });

    const clearFile = () => {
        setFile(null);
        setError(null);
        setUploadProgress(0);
        setUploadComplete(false);
    };

    async function handleUpload(file: File) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = file.name;

        const fileBlob = new Blob([file], { type: file.type });

        const result = await FileService.uploadFile({ fileBlob, fileName });

        if (!result.success) throw new Error(result.errorMessage);

        const fileObject = supabase.storage.from('teste').getPublicUrl(result.file!.url);

        const createFileObject = {
            fileName: filePath,
            materiaId: materiaId as string,
            supabaseId: result.file!.id,
            url: fileObject.data.publicUrl
        };

        await createFileAction(createFileObject);

        setIsUploading(false);
        clearFile();
        setUploadComplete(true);
        
        toast.success("Arquivo enviado com sucesso!");
        
        // Avançar após 1 segundo
        setTimeout(() => {
            onNext?.(fileObject.data.publicUrl);
        }, 1000);
    }

    const uploadFile = async () => {
        if (!file) return;
        setIsUploading(true);
        setError(null);
        simulateProgress();
        try {
            await handleUpload(file);
        } catch (error) {
            console.log('Erro ao fazer upload:', error);
            setError('Ocorreu um erro ao fazer o upload do arquivo.');
            setIsUploading(false);
        }
    };

    const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 500);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">2. Faça upload do seu material</h3>
                    <p className="text-gray-600 mt-2">
                        Envie um PDF que você quer estudar. 
                        Nossa IA vai analisar e extrair o conteúdo para você.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Upload de Arquivo
                    </CardTitle>
                    <CardDescription>
                        Arraste e solte seu arquivo aqui ou clique para selecionar
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className='mt-1'>
                            Apenas arquivos PDF são aceitos. Tamanho máximo: 50MB.
                        </AlertDescription>
                    </Alert>

                    {!uploadComplete ? (
                        <>
                            <div
                                {...getRootProps()}
                                className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer ${
                                    isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
                                }`}
                            >
                                <input {...getInputProps()} />
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-500">
                                    Arraste e solte um arquivo PDF aqui, ou clique para selecionar
                                </p>
                            </div>
                            
                            <Button onClick={() => document.querySelector('input')?.click()} className="w-full mt-4">
                                Selecionar Arquivo PDF
                            </Button>

                            {file && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium">Arquivo Selecionado:</h4>
                                    <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
                                        <span className="flex items-center">
                                            <FileIcon className="mr-2 h-4 w-4" />
                                            {file.name}
                                        </span>
                                        <Button variant="ghost" size="sm" onClick={clearFile}>
                                            Remover
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <Alert variant="destructive" className="mt-4">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className='mt-1'>{error}</AlertDescription>
                                </Alert>
                            )}

                            {isUploading && (
                                <div className="mt-4">
                                    <Progress value={uploadProgress} className="w-full" />
                                    <p className="text-sm text-gray-500 mt-2">Uploading: {uploadProgress.toFixed(0)}%</p>
                                </div>
                            )}

                            <Button 
                                onClick={uploadFile} 
                                className="mt-4 w-full" 
                                variant="outline"
                                disabled={!file || isUploading}
                            >
                                <CheckCircle className='w-4 h-4 mr-2'/>
                                {isUploading ? 'Uploading...' : 'Fazer Upload'}
                            </Button>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-green-600 font-medium">
                                Arquivo enviado com sucesso!
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default RealFileUpload;
